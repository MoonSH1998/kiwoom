<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.json.simple.*" %>
<%@ page import="org.json.simple.parser.*" %>
<%@ page import="core.*" %>
<%@ page import="util.*" %>
<% 
	request.setCharacterEncoding("UTF-8");

	ServletFileUpload sfu = new ServletFileUpload(new DiskFileItemFactory());
	sfu.setSizeMax(16 * 1024 * 1024);
	sfu.setHeaderEncoding("UTF-8"); 
	
	try {
		String mid = null; 
		JSONObject usrobj = null;
		boolean sesup = true;
		
		List items = sfu.parseRequest(request);
		Iterator iter = items.iterator();
		while(iter.hasNext()) {
			FileItem item = (FileItem) iter.next();
			String name = item.getFieldName();

			if (item.isFormField()) {
				String value = item.getString("UTF-8").trim();
				
				if (name.equals("mid")) {
					mid = value;
				}
				else if (name.equals("usrobj")) {
					usrobj = (JSONObject) (new JSONParser()).parse(value);
				}
				else if (name.equals("sesup") && value.equals("F")) {
					sesup = false;
				}
			} else {
				try{
					if(name.equals("image")) {
						String root = application.getRealPath(File.separator);
						String file = Util.stripSpecialChar(Util.getFilename(item.getName()));

						if (file != null) {
							Util.saveImage(root, mid, file, item.get());
							usrobj.put("image", file);
							System.out.println(file);
						}
						System.out.println(name + ": " + file);
					}
				}catch (Exception ex){
					ex.printStackTrace();
				}

			}
		}


		JSONObject addrobj = (JSONObject) usrobj.get("addrobj");
		Object pass = usrobj.get("pass");
		usrobj.remove("pass");
		if (addrobj != null) {
			String addrcode = addrobj.get("code").toString();
			(new UserDAO()).update(mid, addrcode, usrobj);
		} else {
			(new UserDAO()).update(mid, usrobj);
		}

		if (pass != null) {
			String _pass = pass.toString();
			(new UserDAO()).update(mid, _pass);
		}

		// refresh the session with the updated userobj
		if (sesup) {
			SessionManager.put(session, "usrobj", usrobj);
		}
		
	} catch(Exception ex) {
		ex.printStackTrace();
	}
%>