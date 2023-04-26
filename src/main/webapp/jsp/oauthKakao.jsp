<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="core.*" %>
<%@ page import="util.*" %>
<% 
	request.setCharacterEncoding("UTF-8");
	String result = (new ExternApi().getKakaoUserInfoWithCode(request.getParameter("code")));
	
	JSONObject jsonobj = (JSONObject)(new JSONParser().parse(result));
	
	String url = Util.URL;
	url = url + "/externAuth.html";
	//System.out.println(jsonobj);
	if (jsonobj.get("access_token") != null) {
		url += "?oauth=kakao&access_token=" + jsonobj.get("access_token");
		url += "&refresh_token=" + jsonobj.get("refresh_token");
		url += "&caller=" + request.getParameter("caller");
	}
	else {
		url = Util.URL + "/login.html";
	}
	response.sendRedirect(url);
%>

