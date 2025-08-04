



export interface Flyway {
  enabled: boolean,
  locations: string[]
}

export interface Master {
  jdbcUrl: string,
  username: string,
  password: string,
  flyway: Flyway
}



