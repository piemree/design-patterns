class QueryBuilder {
  private table: string;
  private conditions: string[] = [];
  private limitValue?: number;

  constructor(table: string) {
    this.table = table;
  }

  where(column: string, value: string): this {
    this.conditions.push(`${column} = '${value}'`);
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  toSQL(): string {
    let query = `SELECT * FROM ${this.table}`;
    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(" AND ")}`;
    }
    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }
    return query;
  }
}

const sql = new QueryBuilder("users")
  .where("status", "active")
  .where("role", "editor")
  .limit(10)
  .toSQL();

console.log(sql);
