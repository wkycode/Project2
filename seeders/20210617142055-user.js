const { User, AuthenticityToken, Post, Like } = require('../models')
const { Faker } = require('fakergem')
const bcrypt = require("bcrypt")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.destroy({ truncate: true })
    await AuthenticityToken.destroy({ truncate: true})
    await Post.destroy({ truncate: true})
    await Like.destroy({ truncate: true})

    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash('123456', 10)
      await User.create({
        email: `${i}@test.com`,
        passwordHash,
        avatar: Faker.LoremPixel.image("100x100"),
        username: `fswdi${i}`,
        Posts: [
          {
            photo: Faker.LoremPixel.image("200x200"),
            caption: Faker.Lorem.sentence(3),
            content: Faker.Lorem.sentence(3),
            category: 'Work'
          }, {
            photo: Faker.LoremPixel.image("200x200"),
            caption: Faker.Lorem.sentence(3),
            content: Faker.Lorem.sentence(3),
            category: 'Social'
          }, {
            photo: Faker.LoremPixel.image("200x200"),
            caption: Faker.Lorem.sentence(3),
            content: Faker.Lorem.sentence(3),
            category: 'Relationship'
          }
        ]
      }, {
        include: User.Posts
      })
    }
  }
}