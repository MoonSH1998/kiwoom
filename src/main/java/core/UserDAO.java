package core;

import util.ConnectionPool;
import util.MD5;
import util.SqlUtil;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.naming.NamingException;
import java.io.File;
import java.sql.*;

public class UserDAO {

    //signup - check eamil
    public String get(String mid) throws NamingException, SQLException, ParseException {
        String sql = "SELECT jsonstr FROM user where mid = '" + mid + "'";
        return SqlUtil.query(sql);
    }

    public JSONObject insert(String mid, String pass, String imgdir) throws NamingException, SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Statement st = null;
        try {
            conn = ConnectionPool.get();
            st = conn.createStatement();

            JSONObject jsonobj = new JSONObject();
            jsonobj.put("mid", mid);

            String sql = "INSERT INTO user(mid, password, jsonstr) VALUES('" + mid +
                    "', '" + MD5.get(pass) +
                    "', '" + jsonobj.toJSONString() +
                    "')";
            System.out.println(sql);
            SqlUtil.update(sql);

            // create a directory to store images
            (new File(imgdir)).mkdirs();
            return jsonobj;
            }
        finally {
        if (rs!= null) rs.close();
        if (st!= null) st.close();
        if (conn!= null) conn.close();
    }

    }




    // Invoked from login.jsp
    public String login(String mid, String pass) throws NamingException, SQLException, ParseException {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = ConnectionPool.get();
            st = conn.createStatement();

            JSONParser parser = new JSONParser();

            String sql = "SELECT password, jsonstr FROM user where mid = '" + mid + "'";
            rs = st.executeQuery(sql);

            if (!rs.next()) return "NA";

            String md5str = MD5.get(pass);
            System.out.println(md5str);
            if (!md5str.equals(rs.getString("password"))) return "PS";

            // check if authentication check is required
            JSONObject jsonobj = (JSONObject) parser.parse(rs.getString("jsonstr"));
            return jsonobj.toJSONString();

        } finally {
            if (rs!= null) rs.close();
            if (st!= null) st.close();
            if (conn!= null) conn.close();
        }
    }

    public void pwcode(String mid, String pwcode) throws NamingException, SQLException, ParseException {
        String sql = "delete from passcode where mid = '" + mid + "'";
        SqlUtil.update(sql);
        sql = "INSERT INTO passcode(mid, pwcode, wrong) VALUES('" + mid + "', '" + pwcode + "', 0 )";
        SqlUtil.update(sql);
    };

    public int pwcodeC(String mid, String pwcode) throws NamingException, SQLException, ParseException {
        Connection conn = ConnectionPool.get();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSet rs1 = null;
        try {
            String sql = "SELECT wrong FROM passcode WHERE mid = '" + mid + "' ";
            sql += " and pwcode = '" + pwcode + "'";

            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            System.out.println(rs);
            if (!rs.next()) {
                sql = "update passcode set wrong = wrong+1 WHERE mid = '" + mid + "' ";
                SqlUtil.update(sql);
                sql = "SELECT wrong FROM passcode WHERE mid = '" + mid + "'";
                stmt = conn.prepareStatement(sql);
                rs1 = stmt.executeQuery();
                if (rs1.next()) {
                    return rs1.getInt(1);
                }
            }
            return 200;

        } finally {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    }

    // Invoked from userInfo.jsp (without address) from userInfo.html
    public void update(String mid, JSONObject jsonobj) throws NamingException, SQLException {
        Connection conn = ConnectionPool.get();
        PreparedStatement stmt = null;
        try {
            String sql = "UPDATE user SET jsonstr = ? WHERE mid = ?";

            if (mid.equals("admin@gmd.com") || mid.equals("hgkim@syu.ac.kr")) {
                jsonobj.put("admin", "T");
            }

            stmt = conn.prepareStatement(sql);
            stmt.setString(1, jsonobj.toJSONString());
            stmt.setString(2, mid);

            stmt.executeUpdate();

        } finally {
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    }

    // Invoked from userInfo.jsp (with address) from userAddr.html
    public void update(String mid, String addrcode, JSONObject jsonobj) throws NamingException, SQLException {
        Connection conn = ConnectionPool.get();
        PreparedStatement stmt = null;
        try {
            String sql = "UPDATE user SET addrcode = ?, jsonstr = ? WHERE mid = ?";

            stmt = conn.prepareStatement(sql);
            stmt.setString(1, addrcode);
            stmt.setString(2, jsonobj.toJSONString());
            stmt.setString(3, mid);

            stmt.executeUpdate();

        } finally {
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    }

    // Invoked from userInfo.jsp (with address) from admUserInfo.html
    public void update(String mid, String pass) throws NamingException, SQLException {
        Connection conn = ConnectionPool.get();
        PreparedStatement stmt = null;
        try {
            String sql = "UPDATE user SET password = ? WHERE mid = ?";

            stmt = conn.prepareStatement(sql);
            stmt.setString(1, MD5.get(pass));
            stmt.setString(2, mid);

            stmt.executeUpdate();

        } finally {
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    }




}
