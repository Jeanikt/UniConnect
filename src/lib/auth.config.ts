import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "John",
          email: credentials?.email as string,
        }
        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        console.log("GitHub User Login:", profile?.login)
        return profile?.login === "Jeanikt"
      }
      return false
    },
  },
  pages: {
    signIn: "/",
  },
}

export default authConfig