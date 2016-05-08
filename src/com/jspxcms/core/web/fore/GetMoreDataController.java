package com.jspxcms.core.web.fore;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jspxcms.core.domain.ImgInfo;
import com.jspxcms.core.domain.MoreData;
import com.jspxcms.core.repository.SQLDao;

/**
 * GetMoreDataController
 * 滚动条向下划动加载更多的数据
 * @author sungj
 * 
 */
@Controller
public class GetMoreDataController {
	
	@Resource
	private SQLDao dao;
	
	private final static String NO_PICTURE = "/NewsPublish/template/1/default/_files/img/no_picture.jpg";

	/**
	 * ajax动态获取数据
	 * @param page
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getMoreData.jspx",method=RequestMethod.POST)
	public String getMoreData(Integer page, HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		ObjectMapper mapper = new ObjectMapper();
		MoreData data = null;
		Integer start = Integer.valueOf(request.getParameter("limit"));
		String firstId = request.getParameter("firstID")==null?"":request.getParameter("firstID").trim();
		String type = request.getParameter("type");
		int node = type.equals("news")?42:83;
		String sql = "";
		if ("".equals(firstId)) {
			sql = "select c1.f_info_id,c2.f_title,c2.f_small_image,c2.f_meta_description from cms_info c1 ,cms_info_detail c2 where 1=1 and c1.f_info_id = c2.f_info_id and c1.f_node_id="+node+" and c1.f_status='A' "
					+ "  ORDER BY c1.f_publish_date desc";
		} else {
			sql = "select c1.f_info_id,c2.f_title,c2.f_small_image,c2.f_meta_description from cms_info c1 ,cms_info_detail c2 where c1.f_info_id = c2.f_info_id and c1.f_node_id="+node+" and c1.f_status='A' "
					+ " AND c1.f_publish_date < (SELECT f_publish_date FROM cms_info WHERE f_info_id = "+firstId+") ORDER BY c1.f_publish_date desc";
		}
		System.out.println(sql);
		List<Object[]> lists = (List<Object[]>)dao.query(sql, 6, start);
		List<MoreData> list =  new ArrayList<MoreData>();
		for (Object[] obj : lists) {
			data = new MoreData();
			data.setUrl("/NewsPublish/info/"+obj[0]+".jspx");
			data.setTitle(obj[1]+"");
			data.setTitle_cut(data.getTitle().length()>9?data.getTitle().substring(0,10)+"...":data.getTitle());
			data.setSmallImageUrl(obj[2]==null?NO_PICTURE:obj[2]+"");
			data.setDescription(obj[3]==null?"":obj[3]+"");
			data.setDescription_cut(data.getDescription().length()>31?data.getDescription().substring(0,32)+"...":data.getDescription());
			list.add(data);
		}
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(list));
		return null;
	}
	/**
	 * 轮播图
	 * @param page
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getMorePicData.jspx",method=RequestMethod.POST)
	public String getMorePicData(Integer page, HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		ObjectMapper mapper = new ObjectMapper();
		ImgInfo data = null;
		String type = request.getParameter("type");
		int node = type.equals("news")?44:84;
		String sql = "";
		sql = "SELECT c1.f_info_id,c1.f_title,c2.f_image FROM cms_info_detail c1, cms_info_attribute c2, cms_info c3 WHERE 1 = 1 AND c1.f_info_id = c2.f_info_id" 
                +" AND c3.f_info_id = c2.f_info_id "
                +" AND c2.f_attribute_id = 1"
                +" AND c3.f_node_id ="+node
                +" AND c3.f_status = 'A'"
                +" ORDER BY c3.f_publish_date DESC ";
		List<Object[]> lists = (List<Object[]>)dao.query(sql, 4, 0);
		List<ImgInfo> list =  new ArrayList<ImgInfo>();
		for (Object[] obj : lists) {
			data = new ImgInfo();
			data.setUrl("/NewsPublish/info/"+obj[0]+".jspx");
			data.setTitle(obj[1]+"");
			data.setId(obj[0].toString());
			data.setAttrImageUrl(obj[2]==null?NO_PICTURE:obj[2]+"");
			list.add(data);
		}
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(list));
		return null;
	}

}
