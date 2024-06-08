import { Lucia } from "lucia"
import adapter from "./adapter"

interface UserAttributes {
  id: string;
  uid: string;
  email: string;
  name: string;
  username: string;
  about?: string; // Optional about property
}
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  
  },
  getUserAttributes: (attributes : any) => {
    return {
      // githubId: attributes.github_id,
			// username: attributes.username
      id: attributes.id,
      uid: attributes.uid,
      email: attributes.email,
      name : attributes.name,
      username : attributes.username,
      about : attributes.about,
    
    };
  },
 
})
// export function luciaSessionFromCookie(){
//   return cookies().get(lucia.sessionCookieName)?.value
// }
// export const validateRequest = cache(async () => {
//   const headersList = headers()
//   const authorization = headersList.get('authorization')
//   const sessionId =(cookies().get(lucia.sessionCookieName)?.value) ?cookies().get(lucia.sessionCookieName)?.value :   lucia.readBearerToken(authorization ?? "");

//   if (!sessionId)
//     return {
//       user: null,
//       session: null,
//     }

//   const { user, session } = await lucia.validateSession(sessionId)
//   try {
//     if (session && session.fresh) {
//       const sessionCookie = lucia.createSessionCookie(session.id)
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes
//       )
//     }
//     if (!session) {
//       const sessionCookie = lucia.createBlankSessionCookie()
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes
//       )
//     }
//   } catch {
//     // Next.js throws error when attempting to set cookies when rendering page
//   }
//   return {
//     user,
//     session,
//     sessionId
//   }
// })

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}
