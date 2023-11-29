const user = {
  name: "sanadh",
  email: "hello",
  password: "pw",
};

const { password, ...user_ } = user;
console.log(user_);
