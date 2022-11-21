// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const formData = new FormData();
  formData.append("image", image);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await axios.post(
    "http://localhost:5000/file",
    { image },
    config
  );
  res.status(200).json(data);
}
