import React, { useEffect, useState } from 'react';
import supabase from '../supabase'; // Import Supabase client
import { BiSolidAdjust, BiMessageDetail, BiExit, BiEnvelope } from "react-icons/bi";

const Chat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load Dark Mode preference from local storage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(JSON.parse(savedMode));
        }
    }, []);

    // Save Dark Mode preference to local storage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    // Fetch messages for the selected recipient
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
                    .order('created_at', { ascending: true });

                if (error) {
                    console.error("Error fetching messages:", error.message);
                } else {
                    setMessages(data || []);
                }
            } catch (error) {
                console.error("Unexpected error fetching messages:", error.message);
            }
        };

        fetchMessages();

        // Subscribe to real-time updates
        const channel = supabase.channel('chat');
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
            setMessages((prev) => [...prev, payload.new]);
        });
        channel.subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [recipientId, user]);

    // Send message
    const sendMessage = async () => {
        if (!newMessage.trim() || !recipientId) return;

        try {
            const { error } = await supabase.from('messages').insert([
                {
                    text: newMessage,
                    user_id: user.id, // Use Supabase user ID
                    recipient_id: recipientId,
                },
            ]);

            if (error) {
                console.error("Error sending message:", error.message);
            } else {
                setNewMessage('');
            }
        } catch (error) {
            console.error("Unexpected error sending message:", error.message);
        }
    };

    // Handle logout using Supabase
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error logging out:", error.message);
            } else {
                console.log("User logged out successfully!");
            }
        } catch (error) {
            console.error("Unexpected error during logout:", error.message);
        }
    };

    // Toggle Dark/Light Mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`chat-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="header">
                <h2><BiMessageDetail /></h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={toggleDarkMode} className="mode-toggle-button">
                        {isDarkMode ? <BiSolidAdjust /> : <BiSolidAdjust />}
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        <BiExit />
                    </button>
                </div>
            </div>
            <div className="recipient-selector">
                <input
                    type="text"
                    placeholder="Enter recipient's user ID"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                />
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.user_id === user.id ? 'sent' : 'received'}`}>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={sendMessage} className="send-button">
                    <BiEnvelope />
                </button>
            </div>
        </div>
    );
};

export default Chat;