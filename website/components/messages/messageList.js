import {Panel, Content} from "react-bulma-components";

export const MessageList = ({messages}) => {
    return (
        <Panel className="panel-heading has-text-danger">
            {messages.map((mes) => <Content>{mes.createdAt} : {mes.username} - {mes.content}</Content>)}
        </Panel>
    )
}