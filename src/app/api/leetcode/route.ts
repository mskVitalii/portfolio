import { NextResponse } from "next/server";

export const runtime = "edge";

const USERNAME = "mskKote";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

export async function GET() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }

  const json = await res.json();
  const user = json?.data?.matchedUser;
  if (!user) {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }

  return NextResponse.json({
    ranking: user.profile?.ranking ?? null,
    solved: (user.submitStatsGlobal?.acSubmissionNum ?? []) as {
      difficulty: string;
      count: number;
    }[],
  });
}
