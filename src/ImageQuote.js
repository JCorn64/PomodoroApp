import React from 'react';
import axios from 'axios';

export default class ImageQuote extends React.Component {
    state = {
        urlImg: ''
    };

    updatePicture() {
        let url = 'http://localhost:9000/';
        const min = 0;
        const max = 24;
        const rand = min + Math.random() * max;
        const num = Math.round(rand);

        axios.get(url)
        .then(res => {
            let img = res.data[num].data.url;
            this.setState({ urlImg: img });
            //console.log(img);
        });
    }

    componentDidMount() {
        this.updatePicture();
    }

    render() {
        console.log(this.state.urlImg);
        return(
            <div>
                <img src={this.state.urlImg} height='400' width='400' alt="YOU GOT THIS!" />
            </div>
        );
    }
}