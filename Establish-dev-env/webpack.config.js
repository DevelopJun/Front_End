const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    // entry는 webpack의 모듈의 의존관계를 해석하는 시작점이다. 엔트리로 지정된 자바스크립 파일부터 모듈 번들링을 시작한다. 
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    // output은 번들된 내용을 출력할 파일을 말한다. 출력할 파일 설정은 다음과 같이 하면 된다. 파일 경로는 절대 경로로 설정해야 하므로, require로 절대 경로 정보를 확인하여 사용한다. 
    // babel loacder는 확장자가 js 인 파일을 대상으로 변환을 수행한다. Babel을 실행하면 React 코드도 함께 변환할 수 있도록 presets에 react를 추가한다. 

    // 즉 loader을 사용하게 되면, 자바스크립트 파일을 하나로 합칠 수 있을 뿐만 아니라, Babel, React, css, 등 자바스크립트 이외의 파일도 변환 혹은 트랜스 파일이 가능하다.
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['babel-preset-env', 'react']  // babel을 실행하면 React 코드도 함꼐 변화할 수 있도록 presets에 react추가한다. 
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback : 'style-loader', 
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/style.css')
    ],
    resolve:{
        extensions: ['.js', '.css']
    },
};
