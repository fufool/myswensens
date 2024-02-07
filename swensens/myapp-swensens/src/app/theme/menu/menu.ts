import { Menu } from './menu.model';

export const horizontalMenuItems = [ 
    new Menu (1, 'NAV.HOME', '/', null, null, false, null, null, 0),
    new Menu (30, 'NAV.TRADING', null, null, null, true,null, null, 0),
    new Menu (31, 'NAV.METATRADE', '/metatrader', null, null, false, null, null, 30),
    new Menu (32, 'NAV.TRADINGACC', '/trading-account', null, null, false, null, null, 30),
    new Menu (33, 'NAV.MARKETSNEWS', '/overview/markets-news', null, null, false, 'New', 'badge badge-red', 30),
    new Menu (34, 'NAV.HOWTOUSE', '/how-to-use', null, null, false, null, null, 30), 
    new Menu (40, 'NAV.SOCIALTRADE', '/social-trade', null, null, false, null, null, 0),
    // new Menu (41, 'NAV.SOCIALTRADE', '/social-trade', null, null, false, null, null, 40),
    // new Menu (42, 'NAV.CONDITIONS', '/conditions', null, null, false, null, null, 40),
    new Menu (60, 'NAV.PROMOTION', null, null, null, true, null, null, 0),
    new Menu (61, 'NAV.GUZEPROMOTION', '/promotions', null, null, false, null, null, 60),  
    new Menu (62, 'NAV.GUZEREWARDS', '/guze-rewards', null, null, false, null, null, 60),  
    new Menu (65, 'NAV.PARTNERS', '/partners', null, null, false, null, null, 0),  
    new Menu (70, 'NAV.ABOUT', null, null, null, true, null, null, 0),   
    new Menu (71, 'NAV.ABOUT_US', '/about', null, null, false, null, null, 70),   
    // new Menu (72, 'NAV.LICENSE', '/license-regulations', null, null, false, 70),   
    new Menu (73, 'NAV.AWARDS', '/guze-awards', null, null, false, null, null, 70),   
    new Menu (74, 'NAV.CAREERS', '/careers', null, null, false, null, null, 70)
]

export const verticalMenuItems = [ 
    new Menu (1, 'NAV.HOME', '/', null, null, false, null, null, 0),
    new Menu (30, 'NAV.TRADING', null, null, null, true, null, null, 0),
    new Menu (31, 'NAV.METATRADE', '/metatrader', null, null, false, null, null, 30),
    new Menu (32, 'NAV.TRADINGACC', '/trading-account', null, null, false, null, null, 30),
    new Menu (33, 'NAV.MARKETSNEWS', '/overview/markets-news', null, null, false, 'New', 'badge badge-red', 30),
    new Menu (34, 'NAV.HOWTOUSE', '/how-to-use', null, null, false, null, null, 30), 
    new Menu (40, 'NAV.SOCIALTRADE', '/social-trade', null, null, false, null, null, 0),
    // new Menu (41, 'NAV.SOCIALTRADE', '/social-trade', null, null, false, null, null, 40),
    // new Menu (42, 'NAV.CONDITIONS', '/conditions', null, null, false, null, null, 40),
    new Menu (60, 'NAV.PROMOTION', null, null, null, true, null, null, 0),
    new Menu (61, 'NAV.GUZEPROMOTION', '/promotions', null, null, false, null, null, 60),  
    new Menu (62, 'NAV.GUZEREWARDS', '/guze-rewards', null, null, false, null, null, 60),  
    new Menu (65, 'NAV.PARTNERS', '/partners', null, null, false, null, null, 0),  
    new Menu (70, 'NAV.ABOUT', null, null, null, true, null, null, 0),   
    new Menu (71, 'NAV.ABOUT_US', '/about', null, null, false, null, null, 70),   
    // new Menu (72, 'NAV.LICENSE', '/license-regulations', null, null, false, 70),   
    new Menu (73, 'NAV.AWARDS', '/guze-awards', null, null, false, null, null, 70),   
    new Menu (74, 'NAV.CAREERS', '/careers', null, null, false, null, null, 70),   
]