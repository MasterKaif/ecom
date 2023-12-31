exports.CreateUserToken = (conn, DataTypes) => {
    const UserToken = conn.define('userToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false 

        },
        refreshToken: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        // expiresAt: {
        //     type: DataTypes.TIMESTAMP,
        //     allowNull: false
        // }
    })
    return UserToken
}