import React from 'react';
import axios from 'axios';

export default class ImageQuote extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quote: '',
            author: '',

            quoteA: '',
        };
    }

    quoteCleaner() {
        let quoteClean = this.state.quote;

        quoteClean = quoteClean.slice(3, (quoteClean.length-5));
        console.log( quoteClean.slice(3, (quoteClean.length-5)));
        

        this.setState({quote: cleanText})

    }

    updateQuote() {
        let url = 'http://localhost:9000/';

        axios.get(url)
        .then(res => {
            let content = res.data.content;
            JSON.stringify(content);
            let title = res.data.title;
            this.setState({quote: content});
            this.quoteCleaner();
            let cleaned_quote = this.state.quote
            this.setState({quoteA: cleaned_quote});
            this.setState({author: title});
            
        });
    }

    componentDidMount() {
        this.updateQuote();
    }

    render() {
        console.log(this.state.author);
        console.log(this.state.quote);
        
        return(
            <div>
                <p> "{this.state.quoteA}" - {this.state.author}</p>
            </div>
        );
    }
}