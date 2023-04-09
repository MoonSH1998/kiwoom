<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*" %>
<%@ page import="org.json.simple.*" %>
<%@ page import="core.*" %>
<% 
	request.setCharacterEncoding("UTF-8");
	
	String mid = request.getParameter("id");
	String pass = request.getParameter("pw");

	UserDAO dao = new UserDAO();

	if (dao.get(mid) != null) {
		out.println("EX");
		return;
	}
	
	JSONObject jsonobj = dao.insert(mid, pass, Config.getImageDir(application.getRealPath(File.separator), mid));
	if (jsonobj == null) {
		out.println("ER");
		return;
	}

	SessionManager.put(session, "usrobj", jsonobj);
	out.println(jsonobj.toJSONString());
%>