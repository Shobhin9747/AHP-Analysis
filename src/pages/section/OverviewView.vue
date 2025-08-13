<template>
  <PageLayout>
    <template #content>
      <div class="bg-white shadow rounded-lg p-10 sm:p-6">
        <EmployeeCard />
        <div
          class="flex items-center justify-between bg-[#5EBA4F] text-white rounded-md mt-4 px-4 py-2 w-full"
        >
          <div class="flex items-center gap-3">
            <svg
              width="36"
              height="30"
              viewBox="0 0 36 30"
              fill="none"
            >
              <path
                d="M28.7998 0C31.7385 1.19962e-05 33.7959 2.05815 33.7959 5.14355V8.81641H32.3262V5.14258C32.3261 2.86536 31.0041 1.46974 28.7998 1.46973H5.87695C3.67314 1.46988 1.46988 2.71842 1.46973 5.14258C1.46973 7.56691 3.67306 8.81625 5.87695 8.81641H27.918C30.8567 8.81641 33.7959 10.5794 33.7959 13.959V14.6943L34.0264 14.7051C35.1604 14.8146 36 15.7276 36 16.8984V21.3057C36 22.4769 35.1604 23.3895 34.0264 23.499L33.7959 23.5107V24.084C33.7963 27.1901 31.6652 29.3876 28.6533 29.3877H5.14258C1.9835 29.3876 0 27.3419 0 24.084V5.14258C0.000378773 1.76356 2.93858 0.000161673 5.87695 0H28.7998ZM1.46973 24.084C1.46973 26.5084 2.79152 27.873 5.14258 27.873H28.6523C30.8564 27.873 32.3262 26.3571 32.3262 24.084V23.5107H29.3877C26.9633 23.5107 24.9795 21.527 24.9795 19.1025C24.9795 16.6777 26.9633 14.6944 29.3877 14.6943H32.3262V13.959C32.3259 11.5348 30.1219 10.2861 27.918 10.2861H5.87695C4.23748 10.286 2.59884 9.7362 1.46973 8.66406V24.084ZM29.3877 16.1631C27.7713 16.1631 26.4492 17.4861 26.4492 19.1025C26.4495 20.7187 27.7714 22.041 29.3877 22.041H33.7959C34.2367 22.041 34.5303 21.7465 34.5303 21.3057V16.8984C34.5303 16.4576 34.2367 16.1631 33.7959 16.1631H29.3877ZM30.1221 16.8975C31.3709 16.8975 32.326 17.8528 32.3262 19.1016C32.3262 20.3505 31.371 21.3057 30.1221 21.3057C28.8733 21.3055 27.918 20.3504 27.918 19.1016C27.9181 17.8529 28.8735 16.8976 30.1221 16.8975ZM30.1221 18.3672C29.6815 18.3673 29.3878 18.661 29.3877 19.1016C29.3877 19.5423 29.6814 19.8368 30.1221 19.8369C30.563 19.8369 30.8574 19.5424 30.8574 19.1016C30.8573 18.6609 30.5628 18.3672 30.1221 18.3672ZM27.5508 7.34668H12.1221V5.87695H27.5508V7.34668ZM27.5508 4.4082H4.77539V2.93848H27.5508V4.4082Z"
                fill="white"
              />
            </svg>
            <span class="font-semibold">Weekly Average Holiday Pay</span>
            <a
              href="#"
              class="text-white text-sm underline hover:text-gray-100"
            >
              View Calculation
            </a>
          </div>

         
          <div class="font-bold text-lg">£627.51</div>
        </div>
        
      </div>
      <div class="mt-4 sm:mt-6">
        <StatsCards />
      </div>
      <PayBreakdown />
    </template>
  </PageLayout>
</template>

<script setup>
import EmployeeCard from "../../components/EmployeeCard.vue";
import StatsCards from "../../components/StatsCards.vue";
import PayBreakdown from "../../components/PayBreakdown.vue";
import PageLayout from "../../components/PageLayout.vue";
</script>

<style scoped>
.weekstatus-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.weekstatus-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
