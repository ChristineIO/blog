import HomeLink from "../components/HomeLink";
import './styles/PostInstructions.css';

const PostInstructions = () => {
    return (
        <>
            <div className="navbar">
                <HomeLink />
            </div>
            <div className="instructions">
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td># Title Name</td>
                            <td>Big Header</td>
                        </tr>
                        <tr>
                            <td># Subtitle</td>
                            <td>Smaller Header</td>
                        </tr>
                        <tr>
                            <td>**text**</td>
                            <td><b>Bold Text</b></td>
                        </tr>
                        <tr>
                            <td>*text*</td>
                            <td><em>Italic Text</em></td>
                        </tr>
                        <tr>
                            <td>~~text~~</td>
                            <td style={{ textDecorationLine: 'line-through'}}>Strikethrough Text</td>
                        </tr>
                        <tr>
                            <td>[link name](https://example.com)</td>
                            <td><a href="">Link</a></td>
                        </tr>  
                        <tr>
                            <td>-item or *item</td>
                            <td><li>Bullet List</li></td>
                        </tr>
                        <tr>
                            <td>1. item</td>
                            <td>Numbered List</td>
                        </tr>
                        <tr>
                            <td>--- (Only Three)</td>
                            <td>Horizontal Divider Line</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PostInstructions;