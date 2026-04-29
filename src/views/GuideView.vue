<template>
    <v-container class="py-8">
        <v-row dense class="mb-2">
            <v-col cols="12" class="d-flex align-center ga-2">
                <v-btn
                    to="/"
                    icon="mdi-arrow-left"
                    variant="text"
                    size="small"
                ></v-btn>
                <h4 class="text-grey-darken-1">HOW TO USE</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" sm="6" lg="4">
                <v-card elevation="1" class="pt-4">
                    <template #prepend>
                        <v-icon color="accent">mdi-home</v-icon>
                    </template>
                    <template #title>
                        <span class="text-subtitle-2 font-weight-bold">Dashboard</span>
                    </template>
                    <template #text>
                        <p class="text-body-2 text-grey-darken-1">
                            The <strong>Dashboard</strong> shows real-time sensor readings from your SGB device.
                            Each card displays the latest value, its unit, a status indicator, and the time it was recorded.
                        </p>
                        <v-list density="compact" class="pa-0 mt-2">
                            <v-list-item prepend-icon="mdi-thermometer" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Temperature — ambient air temp in °C</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-water" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Humidity — relative air moisture in %</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-water-outline" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Soil Moisture — soil water content in %</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-information-outline" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Alerts — number of readings needing review</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <v-card elevation="1" class="pt-4">
                    <template #prepend>
                        <v-icon color="accent">mdi-chart-bar</v-icon>
                    </template>
                    <template #title>
                        <span class="text-subtitle-2 font-weight-bold">Monitor (Graphs)</span>
                    </template>
                    <template #text>
                        <p class="text-body-2 text-grey-darken-1">
                            The <strong>Monitor</strong> tab displays 24-hour trend graphs for all sensor readings,
                            letting you track how conditions have changed over time.
                        </p>
                        <v-list density="compact" class="pa-0 mt-2">
                            <v-list-item prepend-icon="mdi-chart-line" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">View separate graphs for Humidity, Temperature, and Soil Moisture</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-file-pdf-box" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Tap <em>Export PDF</em> to save a full monitoring report</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <v-card elevation="1" class="pt-4">
                    <template #prepend>
                        <v-icon color="accent">mdi-sprout</v-icon>
                    </template>
                    <template #title>
                        <span class="text-subtitle-2 font-weight-bold">Growth (Detection)</span>
                    </template>
                    <template #text>
                        <p class="text-body-2 text-grey-darken-1">
                            The <strong>Growth</strong> tab uses AI to detect objects (e.g. leaves and plants)
                            in real time or from an uploaded image.
                        </p>
                        <v-list density="compact" class="pa-0 mt-2">
                            <v-list-item prepend-icon="mdi-camera" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Tap the camera button to scan live via your device camera</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-image" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Tap the image button to upload a photo for detection</v-list-item-title>
                            </v-list-item>
                            <v-list-item prepend-icon="mdi-pause-circle-outline" density="compact" class="px-0">
                                <v-list-item-title class="text-caption">Pause the scan to capture and save a frame with bounding boxes</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <!-- Detectable Classes -->
        <v-row dense class="mt-4">
            <v-col cols="12">
                <h4 class="text-grey-darken-1">DETECTABLE CONDITIONS</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col
                v-for="cls in classes"
                :key="cls.name"
                cols="12"
                sm="6"
                lg="4"
            >
                <v-card elevation="1" class="pt-4">
                    <template #prepend>
                        <v-icon :color="cls.color">{{ cls.icon }}</v-icon>
                    </template>
                    <template #title>
                        <span class="text-subtitle-2 font-weight-bold">{{ cls.name }}</span>
                    </template>
                    <template #append>
                        <v-chip size="x-small" :color="cls.color" variant="tonal">{{ cls.type }}</v-chip>
                    </template>
                    <template #text>
                        <p class="text-body-2 text-grey-darken-1">{{ cls.description }}</p>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
const classes = [
    {
        name: "Healthy",
        type: "Normal",
        icon: "mdi-leaf",
        color: "accent",
        description: "The leaf shows no signs of disease, pest damage, or stress. Growth conditions are optimal.",
    },
    {
        name: "Brown Eye Spot",
        type: "Disease",
        icon: "mdi-alert-circle-outline",
        color: "brown",
        description: "A fungal disease (Cercospora) causing circular brown spots with yellow halos on leaves. Spreads in warm, humid conditions.",
    },
    {
        name: "Leaf Minor",
        type: "Pest",
        icon: "mdi-bug-outline",
        color: "orange",
        description: "Damage from leaf-mining insects that tunnel between the upper and lower surfaces of the leaf, leaving pale winding trails.",
    },
    {
        name: "Leaf Rust",
        type: "Disease",
        icon: "mdi-alert-outline",
        color: "deep-orange",
        description: "A fungal infection producing rusty-orange to reddish-brown powdery pustules on the underside of leaves.",
    },
    {
        name: "Red Spider Mite",
        type: "Pest",
        icon: "mdi-spider-thread",
        color: "red",
        description: "Tiny mite infestation causing stippling, yellowing, and fine webbing on leaves. Thrives in hot and dry conditions.",
    },
]
</script>
