<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="core.*" %>
<%
    String mid = request.getParameter("mid");
    String pass = request.getParameter("pass");

    String _pass = pass.toString();
    (new UserDAO()).update(mid, _pass);

%>
