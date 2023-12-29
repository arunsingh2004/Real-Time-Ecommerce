// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincode = {
    271903: ["Bahraich", "Uttar Pradesh"],
    800005: ["Patna", "Bihar"],
  };
  res.status(200).json(pincode);
}
