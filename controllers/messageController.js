import messageQuery from "../db/messageQuery.js";

const newMessageGET = async (req, res) => {
    res.render('newmessage', { title: 'New Message', formData: {} });
}

const newMessagePOST = async (req, res) => {
    const author_id = req.user.id;
    const { content, title } = req.body;

    await messageQuery.addNewMessage({ title, content, author_id });

    res.redirect('/messages/all');
}

const allMessageGET = async (req, res) => {
    if (req.user.is_member) {
        const messages = await messageQuery.getAllMessages();

        return res.send(messages);
    }

    const messages = await messageQuery.allMessagesProtected();

    res.send(messages);
}

export { newMessageGET, newMessagePOST, allMessageGET };