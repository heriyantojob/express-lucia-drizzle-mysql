import { DrizzlePostgreSQLAdapter ,DrizzleMySQLAdapter} from "@lucia-auth/adapter-drizzle"
import  {db}  from "@/db/setup";
//import { sessionTable, userTable } from "../database/schema"
import { users,sessions } from "@/db/schema";
//const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)
const adapter = new DrizzleMySQLAdapter(db, sessions, users)

export default adapter
