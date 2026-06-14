import messageQuery from "../db/messageQuery.js";

const newMessageGET = async (req, res) => {
    res.render('newmessage', { title: 'New Message', formData: {} });
}

const newMessagePOST = async (req, res) => {
    const author_id = req.user.id;
    const { content, title } = req.body;

    await messageQuery.addNewMessage({ title, content, author_id });

    res.redirect('/');
}

const allMessageGET = async (req, res) => {
    if (req.user.is_member) {
        const messages = await messageQuery.getAllMessages();

        return res.render('home', {title: 'All Posts', messages: messages});
    }

    const messages = await messageQuery.allMessagesProtected();

    res.render('home', {title: 'All Posts', messages: messages});
}

const deletMessageGET = async (req, res) => {
    await messageQuery.deleteMessage(req.query.id);

    res.redirect('/');
}

export { newMessageGET, newMessagePOST, allMessageGET, deletMessageGET };