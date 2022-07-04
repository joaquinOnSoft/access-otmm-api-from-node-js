const axios = require('axios');
const querystring = require('node:querystring');
require('dotenv').config()

const url = process.env.OTMM_API_URL;
const user = process.env.OTMM_USER;
const pass = process.env.OTMM_PASSWORD;

class OTMMAPI{
	
	/**
	 * <strong>Create a Session</strong>
	 * Create a security Session in OTMM. It returns a valid SecuritySession
	 * object if the provided credentials are valid. This is equivalent to login to OTMM
	 * <ul>
	 * 	<li>Method: POST</li>
	 * 	<li>API method: /v6/sessions</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/sessions</li>
	 * </ul>
	 * <strong>NOTE:</strong>
	 * With the exception of methods related to 'sessions', any call to an OTMM REST API
	 * method must include the session id in the 'X-Requested-By' header.
	 * @param user - User alias
	 * @param pass - User password
	 * @return session information
	 * <code>
	 * {
	 *	  session_resource: {
	 *		session: {
	 *		  domain_name: 'OTMM',
	 *		  id: 471542185,
	 *		  local_session: false,
	 *		  login_name: 'tsuper',
	 *		  message_digest: 'b8271108836bef44130e71ee91bd51d4e75e2733',
	 *		  role_name: 'Administrator',
	 *		  user_full_name: 'admin, otmm',
	 *		  user_id: '1001',
	 *		  user_role_id: 1,
	 *		  validation_key: -2045393682
	 *		}
	 *	  }
	 *	}
	 * </code>
	 */
	static async createSession(user, pass){
		try {
			let link = url + "/v6/sessions";
			console.log("URL: " + link);
			
			let payloadJSON  = {
				"username": user,
				"password": pass
			};
			let payload =  (new URLSearchParams(payloadJSON)).toString()

			const resp = await axios.post(link, payload, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				}
			});
			
			return resp.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	}


	/**
	 * Get list of collections for current user
	 * @see <a href="https://masteringjs.io/tutorials/axios/headers">Setting Request Headers with Axios</a>
	 */
	static async getListOfCollectionsForCurrentUser(session){
		try {		
			let link = url + "/v6/collections";
			console.log("URL: " + link);
			
			let result = await axios.get(link, 
				{
					headers: {
						"X-Requested-By": session.session_resource.session.id,
						"Authorization":  "Bearer otmmToken " + session.session_resource.session.message_digest,
						"otmmauthtoken":  session.session_resource.session.message_digest
					}
				});
					
			//console.info(result);
			
			return result.data;
		} catch (error) {
			console.error("Error: " + error);
			return null;
		}
	}
}

OTMMAPI.createSession(user, pass).then( session => {
    console.log(session);
	
	OTMMAPI.getListOfCollectionsForCurrentUser(session).then(collections => {
		console.log( JSON.stringify(collections) );
	});	
});

