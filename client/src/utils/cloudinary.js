import { v4 as uuidv4 } from 'uuid';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'miamour_uploads');
  formData.append('cloud_name', 'djvhlf3pe');
  formData.append('public_id', `miamour/${uuidv4()}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djvhlf3pe/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Failed to upload image to Cloudinary');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
