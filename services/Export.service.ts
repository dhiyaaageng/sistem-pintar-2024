import API from ".";

export const getLogExport = async () => {
  try {
    const response = await API.get('/export', {
      responseType: 'blob'
    });
    
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = response.headers['content-disposition']?.split('filename=')[1] || 'health_data.xlsx';
    link.click();
    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};