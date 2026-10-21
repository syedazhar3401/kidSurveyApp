import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'little_techies_survey_responses_v1';

/**
 * Get all saved survey responses from local cache
 * @returns {Array} List of responses, sorted newest first
 */
export function getLocalResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return [];
  }
}

/**
 * Save responses to local cache
 */
function setLocalResponses(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to write to localStorage:', error);
  }
}

/**
 * Fetch all survey responses (from Supabase if configured, otherwise localStorage)
 * @returns {Promise<Array>} List of responses, sorted newest first
 */
export async function fetchResponses() {
  const localList = getLocalResponses();

  if (!isSupabaseConfigured()) {
    return localList;
  }

  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch failed, falling back to local storage:', error.message);
      return localList;
    }

    if (data) {
      // Map database row snake_case back to app record format
      const formatted = data.map((row) => ({
        id: row.id,
        childName: row.child_name,
        answers: row.answers,
        timestamp: row.created_at,
        formattedTime: row.formatted_time,
        formattedDate: row.formatted_date,
      }));

      // Update local storage cache
      setLocalResponses(formatted);
      return formatted;
    }
    return localList;
  } catch (err) {
    console.warn('Network error fetching from Supabase, using local cache:', err);
    return localList;
  }
}

/**
 * Save a new survey response (syncs to Supabase and caches locally)
 * @param {string} childName
 * @param {object} answers
 * @returns {Promise<object>} The newly created record
 */
export async function saveResponse(childName, answers) {
  const now = new Date();
  const newRecord = {
    id: 'resp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    childName: childName.trim(),
    answers,
    timestamp: now.toISOString(),
    formattedTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    formattedDate: now.toLocaleDateString(),
  };

  // 1. Immediately cache locally for offline speed
  const localList = getLocalResponses();
  const updatedLocal = [newRecord, ...localList];
  setLocalResponses(updatedLocal);

  // 2. If Supabase is connected, push to cloud in background
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('survey_responses').insert([
        {
          id: newRecord.id,
          child_name: newRecord.childName,
          answers: newRecord.answers,
          created_at: newRecord.timestamp,
          formatted_time: newRecord.formattedTime,
          formatted_date: newRecord.formattedDate,
        },
      ]);
      if (error) {
        console.warn('Supabase cloud insert warning (saved locally):', error.message);
      }
    } catch (err) {
      console.warn('Supabase cloud network error (saved locally):', err);
    }
  }

  return newRecord;
}

/**
 * Delete a specific response by its ID (from cloud and local)
 * @param {string} id
 * @returns {Promise<Array>} Updated list of responses
 */
export async function deleteResponse(id) {
  // Update local cache immediately
  const localList = getLocalResponses();
  const updatedLocal = localList.filter((r) => r.id !== id);
  setLocalResponses(updatedLocal);

  // Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('survey_responses')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete network error:', err);
    }
  }

  return updatedLocal;
}

/**
 * Clear all responses
 */
export async function clearAllResponses() {
  setLocalResponses([]);

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('survey_responses')
        .delete()
        .neq('id', '___non_existent___');

      if (error) {
        console.warn('Supabase clear warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase clear network error:', err);
    }
  }

  return [];
}

/**
 * Export responses as a downloadable CSV file
 * @param {Array} responses
 */
export function exportToCSV(responses) {
  if (!responses || responses.length === 0) {
    alert('No responses to export yet!');
    return;
  }

  const headers = [
    'No.',
    'Child Name',
    'Date',
    'Time',
    'Q1: Do robots do what we tell them?',
    'Q2: Can a computer guess what you draw?',
    'Q3: Do you like learning about computers?',
    'Q4: Which booth was your favourite?',
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = responses.map((r, index) => {
    return [
      index + 1,
      r.childName || 'Anonymous',
      r.formattedDate || '',
      r.formattedTime || '',
      r.answers?.q1?.label ? `${r.answers.q1.emoji || ''} ${r.answers.q1.label}`.trim() : 'N/A',
      r.answers?.q2?.label ? `${r.answers.q2.emoji || ''} ${r.answers.q2.label}`.trim() : 'N/A',
      r.answers?.q3?.label ? `${r.answers.q3.emoji || ''} ${r.answers.q3.label}`.trim() : 'N/A',
      r.answers?.q4?.label ? `${r.answers.q4.emoji || ''} ${r.answers.q4.label}`.trim() : 'N/A',
    ].map(escapeCSV).join(',');
  });

  const csvContent = '\uFEFF' + [headers.map(escapeCSV).join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('download', `Little_Techies_Survey_Results_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Load mock demo responses for previewing charts
 */
export function loadMockResponses() {
  const mockNames = ['Aisyah', 'Adam', 'Sarah', 'Zayn', 'Mia', 'Rayyan', 'Hana'];
  const mockQ1 = ['Yes!', 'Yes!', 'Yes!', 'Yes!', 'No!', 'Not sure', 'Yes!'];
  const mockQ2 = ['Yes!', 'Yes!', 'Not sure', 'Yes!', 'Yes!', 'Yes!', 'No!'];
  const mockQ3 = ['Love it!', 'Love it!', 'Love it!', "It's okay", 'Love it!', 'Love it!', "It's okay"];
  const mockQ4 = ['Shape Robot', 'Guess My Drawing', 'Voice Changer', 'Shape Robot', 'Voice Changer', 'Red Light Game', 'Guess My Drawing'];

  const mockList = mockNames.map((name, i) => ({
    id: 'mock_' + (i + 1),
    childName: name,
    answers: {
      q1: { id: 'yes', label: mockQ1[i], emoji: mockQ1[i] === 'Yes!' ? '👍' : mockQ1[i] === 'No!' ? '👎' : '🤔' },
      q2: { id: 'yes', label: mockQ2[i], emoji: mockQ2[i] === 'Yes!' ? '👍' : mockQ2[i] === 'No!' ? '👎' : '🤔' },
      q3: { id: 'love', label: mockQ3[i], emoji: mockQ3[i] === 'Love it!' ? '😃' : '😐' },
      q4: { id: 'booth', label: mockQ4[i], emoji: '🤖' },
    },
    timestamp: new Date(Date.now() - (7 - i) * 180000).toISOString(),
    formattedTime: new Date(Date.now() - (7 - i) * 180000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    formattedDate: new Date().toLocaleDateString(),
  }));

  setLocalResponses(mockList);
  return mockList;
}
