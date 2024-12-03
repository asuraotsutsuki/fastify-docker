import {useEffect, useState} from 'react'

function App() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch da API na rota localhost/post
        const fetchPost = async () => {
            try {
                const response = await fetch("//localhost:3000/");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data[0]); // Define o post retornado
            } catch (err) {
                setError(err.message); // Captura o erro, se ocorrer
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchPost();
    }, []);

    if (loading) return <p>Loading...</p>; // Exibe "carregando" enquanto busca os dados
    if (error) return <p>Error: {error}</p>; // Exibe a mensagem de erro, se ocorrer

    // Renderiza o card apenas se o post existir
    return post ? (
        <div style={styles.card}>
            <img src={post.image} alt={post.title} style={styles.image} />
            <div>
                <h2 style={styles.title}>{post.title}</h2>
                <p style={styles.author}>By {post.author}</p>
                <p style={styles.content}>{post.content}</p>
            </div>
        </div>
    ) : (
        <p>No post available</p>
    );
}

// Estilos simples para o card
const styles = {
    card: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "800px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        gap: "32px",
        margin: "40px auto 0"
    },
    image: {
        width: "300px",
        borderRadius: "4px",
        marginBottom: "8px"
    },
    title: {
        fontSize: "1.5rem",
        margin: "8px 0",
    },
    author: {
        color: "#555",
        fontStyle: "italic",
        marginBottom: "8px",
    },
    content: {
        fontSize: "1rem",
        lineHeight: "1.5",
    },
}

export default App
