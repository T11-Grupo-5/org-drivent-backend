import { Prisma } from '@prisma/client';
import axios from 'axios';
import qs from 'qs';
import { prisma } from '@/config';

async function createSession(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findSession(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
    },
  });
}

async function getAcessToken(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URL } = process.env;
  const body = {
    code,
    grant_type: 'authorization_code',
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    redirect_uri: GITHUB_REDIRECT_URL,
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token: any) {
  const GITHUB_USER_URL = 'https://api.github.com/user';
  const { data } = await axios.get(GITHUB_USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export const authenticationRepository = {
  createSession,
  findSession,
  getAcessToken,
  fetchUser,
};
