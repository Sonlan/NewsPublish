package com.jspxcms.common.util;

/**
 * 系统配置信息Bean
 * 
 * @author
 */
public class SysConfig {


	/**
	 * 文件服务器Url
	 */
	private String fileServiceUrl;

    /**
     * 下载文件路径 
     */
    private String configRoot;
    
	public String getFileServiceUrl() {
		return fileServiceUrl;
	}

	public void setFileServiceUrl(String fileServiceUrl) {
		this.fileServiceUrl = fileServiceUrl;
	}
	
	public String getConfigRoot() {
		return configRoot;
	}

	public void setConfigRoot(String configRoot) {
		this.configRoot = configRoot;
	}
}
