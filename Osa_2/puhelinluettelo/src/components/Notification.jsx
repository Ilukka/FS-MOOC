const Notification = ({ message, color }) => {
    if (message === null) {
        return null
    }
    const notifStyle = {
        color: color,
        background: 'lightyellow',
        fontSize: 20,
        borderStyle: 'dotted',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notifStyle}>{message}</div>
    )
}   

export default Notification