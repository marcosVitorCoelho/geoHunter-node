import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRESIN_TIME});
};


export const generateRefreshToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN_TIME });
};