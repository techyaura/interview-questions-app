<template>
  <div class="user-profile">
    <div class="col-md-12">
      <div class="page-content">
        <h2>About User</h2>
        <div class="ph-item" v-if="spinner.status">
          <div class="ph-col-2">
            <div class="ph-avatar"></div>
          </div>
          <div>
            <div class="ph-row">
              <div class="ph-col-12"></div>
              <div class="ph-col-4"></div>
              <div class="ph-col-10 empty"></div>
              <div class="ph-col-8 big"></div>
              <div class="ph-col-4 big empty"></div>
            </div>
          </div>
          <div class="ph-col-12">
            <div class="ph-row">
              <div class="ph-col-12"></div>
            </div>
          </div>
        </div>
        <div class="user-profile-img" v-if="!spinner.status">
          <img width="60" height="60" :src="'/img/profile/' + user.avatar" :alt="user.avatar">
        </div>
        <div class="ul_list ul_list-icon-ok about-user" v-if="!spinner.status">
          <ul>
            <li>
              <!-- <i class="icon-plus"></i>Registerd On: -->
              <span>{{user.username}}</span>
            </li>
            <li>
              <i class="icon-plus"></i>Registerd On:
              <span>{{$moment(user.createdAt).format('MMMM Do YYYY')}}</span>
            </li>
            <li>
              <i class="icon-map-marker"></i>Country :
              <span>{{user.country? user.country: 'N/A'}}</span>
            </li>
          </ul>
        </div>
        <p>{{user.bio}}</p>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- <div class="col-md-12">
      <AppMyQuestion/>
    </div>
    <div class="col-md-12">
      <AppMyAnswer/>
    </div>-->
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { breadcrumbMixin, filterMixin, spinnerMixin } from '../mixins';

export default {
  name: 'Profile',
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  data() {
    return {
      username: this.$route.params.username,
      user: {},
    };
  },
  methods: {
    profile(username) {
      this.$http
        .get(`${this.$BASE_URL}api/v1/auth/user/${username}`, {
          errorHandle: false,
        })
        .then((response) => {
          this.user = response.data.data;
          document.title = this.title(`User ${username}`);
          this.spinner.status = false;
        })
        .catch(() => {
          if (this.token && this.username === this.userData.username) {
            return this.$store.dispatch('auth/destroySession').then(() => {
              this.$router.push('/login');
            });
          }
          return this.$router.push('*');
        });
    },
  },
  created() {
    this.profile(this.username);
  },
  computed: {
    ...mapGetters({
      userData: 'auth/getUser',
      token: 'auth/getToken',
    }),
  },
};
</script>
