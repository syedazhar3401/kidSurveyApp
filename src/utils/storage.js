const STORAGE_KEY = 'little_techies_survey_responses_v1';

/**
 * Get all saved survey responses from localStorage
 * @returns {Array} List of responses, sorted newest first
 */
export function getResponses() {
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
 * Save a new survey response
 * @param {string} childName
 * @param {object} answers - e.g. { q1: { id, label, emoji }, ... }
 * @returns {object} The newly created record
 */
export function saveResponse(childName, answers) {
  try {
    const records = getResponses();
    const newRecord = {
      id: 'resp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      childName: childName.trim(),
      answers,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      formattedDate: new Date().toLocaleDateString(),
    };
    
    // Add newest at the top
    const updated = [newRecord, ...records];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    throw error;
  }
}

/**
 * Delete a specific response by its ID
 * @param {string} id
 * @returns {Array} Updated list of responses
 */
export function deleteResponse(id) {
  try {
    const records = getResponses();
    const updated = records.filter(record => record.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete record:', error);
    return getResponses();
  }
}

/**
 * Clear all responses (useful for starting fresh on event day)
 */
export function clearAllResponses() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Failed to clear responses:', error);
    return [];
  }
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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockList));
  return mockList;
}
