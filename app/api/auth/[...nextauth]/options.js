import CredentialsProvider from "next-auth/providers/credentials"

import connectDB from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const options = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: "",
        password: ""
      },
      authorize: connectDB(async(credentials, req) => {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
        // Return null if user data could not be retrieved
        return null
      })

    })
  ],
  callbacks: {},
}

export default options