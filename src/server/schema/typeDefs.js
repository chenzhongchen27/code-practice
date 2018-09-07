const typeDefs = `
  type Order {
    id: Int!
    money: Float
    pay: Float
    summary: String
    # orm
    archives: [Archive]
  }

  type Archive {
    id: Int!
    price: Float
    name: String
    created_at: String
    updated_at: String
    #orm
    order: Order
    image_url: String
  }

  type User {
    id: Int!
    name: String
    sex: Boolean
    email: String
    #not display passwrod
    #orm
    orders(name: String): [Order]
  }


  type Fruit {
    id: Int!
    name: String!
    price: Float
    count: Int
    likes: Int
    #orm
    image: Image
    category: Category
  }

  type PureFruit {
    id: Int!
    name: String!
    price: Float
    count: Int
    likes: Int
    #orm
    image: Image
  }

  type Cart {
    id: Int!
    fruits(likes:Int): [Fruit]
  }

  type Image {
    id: Int!
    url: String
  }

  type Category {
    id: Int!
    name: String
    fruits: [PureFruit]
  }

  # the schema allows the following query:
  type Query {
    user(id: Int!): User
    fruits(likes: Int): [Fruit]
    cart(id: Int!): Cart
    order(id: Int!): Order
    orders(name: String): [Order]
    categories:[Category]
  }

`;
module.exports = typeDefs;
