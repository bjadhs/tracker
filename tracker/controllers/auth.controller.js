export const signUp = async (req, res, next) => {
    try {
       await  res.send('Register user');
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        await  res.send('Login user');
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        await res.send('SignOut user');
    } catch (error) {
        next(error);
    }
};