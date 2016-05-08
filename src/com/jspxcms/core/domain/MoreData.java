package com.jspxcms.core.domain;

public class MoreData {

	private String id;
	private String url;
	private String title;
	private String title_cut;
	private String description_cut;
	private String smallImageUrl;
	private String description;
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
	public String getSmallImageUrl() {
		return smallImageUrl;
	}
	public void setSmallImageUrl(String smallImageUrl) {
		this.smallImageUrl = smallImageUrl;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle_cut() {
		return title_cut;
	}
	public void setTitle_cut(String title_cut) {
		this.title_cut = title_cut;
	}
	public String getDescription_cut() {
		return description_cut;
	}
	public void setDescription_cut(String description_cut) {
		this.description_cut = description_cut;
	}
	
}
