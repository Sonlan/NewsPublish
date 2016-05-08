package com.jspxcms.core.domain;
/**
 * 轮播图实体类
 * @author Administrator
 *
 */
public class ImgInfo {
	private String id;
	private String url;
	private String title;
	private String attrImageUrl;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAttrImageUrl() {
		return attrImageUrl;
	}
	public void setAttrImageUrl(String attrImageUrl) {
		this.attrImageUrl = attrImageUrl;
	}
	
}
