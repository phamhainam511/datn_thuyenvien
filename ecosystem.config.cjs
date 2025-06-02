module.exports = {
	apps: [
		{
			name: 'datn-thuyenvien-api',      
			script: 'src/server.js',                 
			env: {
			  NODE_ENV: 'production',
			  PORT: 8081                 
			}
 }
		]
}

