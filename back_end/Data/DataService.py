
def readUsers():
    with open('./Data/users.txt', 'r') as f:
        users = {}
        for line in f:
            user, pwd, attr = line.strip().split(',')
            users[user] = {'password': pwd, 'attribute': int(attr)}
    f.close();
    return users;



def writeUsers(users):
    with open('./Data/users.txt', 'w') as f:
        for user in users:
            # se o campo attribute for None, escreve 0
            if users[user]['attribute'] == None:
                users[user]['attribute'] = -1
            f.write(f"{user},{users[user]['password']},{users[user]['attribute']}\n")
    f.close();