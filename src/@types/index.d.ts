// import { UserDocument } from "../models/user.model";

// declare global {
//   namespace Express {
//     interface Request {
//       firebaseUser?: {
//         uid: string;
//         email?: string;
//         displayName?: string;
//         email_verified?: boolean;
//         // Tambahkan properti lain yang relevan
//       };
//     }
//     interface User extends UserDocument {
//       _id?: any;
//     }
//   }
// }

import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
  }
}