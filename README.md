# sleek-chrome-ext
Chrome extension for sleek cashback

The extension makes a call to the cashback backend server running at localhost:8082. The extension interacts with the server in following two ways:

1. Get available deals list - When a url is loaded, Extension makes a GET call to backend server's 'deals' extension to retrieve list of available deals. Backend returns the deal array in following format:
{
	deal_id: Unique identifier for the deal
	retailer_id: Unique identifier of the retailer
	retailer_name: Name of the retailer
	retailer_domains: Applicable domains for the retailer
	deal_type: Type of deal (can be PERCENTAGE or FIXED)
	deal_amount: Deal amount
}

2. Activate deal - When a user wants to activate a deal, the client makes POST call to backend server's 'activate' extension along with id of the deal which needs to be activated. Backend throws an error if the call is unsuccessful, otherwise it returns a SUCCESS.

How to run the extension?
1. Start the backend server
2. Load extension to the chrome browser
3. Access the website	
