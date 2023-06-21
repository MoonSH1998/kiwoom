<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="core.*" %>
<%@ page import="util.Mail" %>
<%
    String mid = request.getParameter("mid");
    String pwcode = request.getParameter("pwcode");
    String type = request.getParameter("type");


    if(type != null){
        out.print((new UserDAO()).pwcodeC(mid, pwcode));
    }else {
        (new Mail()).send(mid, pwcode);
        (new UserDAO()).pwcode(mid, pwcode);
    };

%>
