export const uploadFile = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          data: {
            fileId: 'file-' + Date.now(),
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            fileData: e.target.result,
            uploadedAt: new Date().toISOString(),
          },
        });
      };
      reader.readAsArrayBuffer(file);
    }, 1000);
  });
};

export const analyzeFile = async (fileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          dimensions: {
            x: 120.5,
            y: 85.3,
            z: 45.2,
          },
          volume: 463250,
          surfaceArea: 45680,
          triangles: 12456,
          isManifold: true,
        },
      });
    }, 1200);
  });
};

export const bookAppointment = async (appointmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          appointmentId: 'APT-' + Date.now(),
          ...appointmentData,
          status: 'Confirmed',
          bookedAt: new Date().toISOString(),
        },
      });
    }, 800);
  });
};
