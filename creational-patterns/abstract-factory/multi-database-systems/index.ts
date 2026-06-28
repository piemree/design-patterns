// User Repository Product
interface UserRepository {
  getById(id: string): void;
}

// Log Repository Product
interface LogRepository {
  logActivity(message: string): void;
}

// PostgreSQL Products
class PostgresUserRepository implements UserRepository {
  getById(id: string): void {
    console.log(
      `PostgreSQL: 'SELECT * FROM users WHERE id = ${id}' query is executed.`,
    );
  }
}

class PostgresLogRepository implements LogRepository {
  logActivity(message: string): void {
    console.log(`PostgreSQL: '${message}' data is inserted into logs table.`);
  }
}

// MongoDB Products
class MongoUserRepository implements UserRepository {
  getById(id: string): void {
    console.log(`MongoDB: db.users.findOne({ _id: ${id} }) query is executed.`);
  }
}

class MongoLogRepository implements LogRepository {
  logActivity(message: string): void {
    console.log(`MongoDB: '${message}' data is inserted into logs collection.`);
  }
}

interface DatabaseFactory {
  createUserRepository(): UserRepository;
  createLogRepository(): LogRepository;
}

class PostgresDatabaseFactory implements DatabaseFactory {
  createUserRepository(): UserRepository {
    return new PostgresUserRepository();
  }
  createLogRepository(): LogRepository {
    return new PostgresLogRepository();
  }
}

class MongoDatabaseFactory implements DatabaseFactory {
  createUserRepository(): UserRepository {
    return new MongoUserRepository();
  }
  createLogRepository(): LogRepository {
    return new MongoLogRepository();
  }
}

class UserService {
  private userRepo: UserRepository;
  private logRepo: LogRepository;

  constructor(factory: DatabaseFactory) {
    this.userRepo = factory.createUserRepository();
    this.logRepo = factory.createLogRepository();
  }

  getUserDetails(id: string): void {
    this.userRepo.getById(id);
    this.logRepo.logActivity(`User details are viewed. ID: ${id}`);
  }
}

let dbType: "postgres" | "mongodb" = "postgres";
let dbFactory: DatabaseFactory;

if (dbType === "postgres") {
  dbFactory = new PostgresDatabaseFactory();
} else {
  dbFactory = new MongoDatabaseFactory();
}

const userService = new UserService(dbFactory);
userService.getUserDetails("42");
