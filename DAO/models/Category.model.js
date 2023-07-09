/*
    id: integer, primary, autoincreament
    name: string, notnull
    description: string
*/
const defineCategory = (conn, DataTypes) => {
    const Category = conn.define("category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        }
    })

    return Category
}

module.exports = defineCategory;