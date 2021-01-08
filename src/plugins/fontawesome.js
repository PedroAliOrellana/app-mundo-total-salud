import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faBuilding,
  faImages,
  faAt,
  faTrashAlt,
  faEye,
  faFileArchive,
  faSearch,
  faThumbsUp,
  faSmile,
  faSignOutAlt,
  faShareAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
 
library.add(faSignOutAlt,faHome, faBuilding, faImages, faAt, faTrashAlt,faEye,faFileArchive,faSearch,faThumbsUp,faSmile,faShareAlt);
 
Vue.component("font-awesome-icon", FontAwesomeIcon);