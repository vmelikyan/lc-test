{{/*
Expand the name of the chart.
*/}}
{{- define "lc-apps.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "lc-apps.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "lc-apps.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "lc-apps.labels" -}}
helm.sh/chart: {{ include "lc-apps.chart" . }}
{{ include "lc-apps.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "lc-apps.selectorLabels" -}}
app.kubernetes.io/name: {{ include "lc-apps.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- if .Values.appName }}
app: {{ .Values.appName }}
{{- end }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "lc-apps.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "lc-apps.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Get the selected app configuration
*/}}
{{- define "lc-apps.selectedApp" -}}
{{- if .Values.appName }}
{{- if hasKey .Values.apps .Values.appName }}
{{- index .Values.apps .Values.appName | toYaml }}
{{- else }}
{{- fail (printf "App '%s' not found in values.apps" .Values.appName) }}
{{- end }}
{{- else }}
{{- range $name, $app := .Values.apps }}
{{- if $app.enabled }}
{{- $app | toYaml }}
{{- end }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Get the selected app name
*/}}
{{- define "lc-apps.selectedAppName" -}}
{{- if .Values.appName }}
{{- .Values.appName }}
{{- else }}
{{- range $name, $app := .Values.apps }}
{{- if $app.enabled }}
{{- $name }}
{{- end }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Get the image for the deployment
*/}}
{{- define "lc-apps.image" -}}
{{- $selectedApp := include "lc-apps.selectedApp" . | fromYaml }}
{{- if .Values.image.repository }}
{{- .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}
{{- else if $selectedApp.image.repository }}
{{- $selectedApp.image.repository }}:{{ $selectedApp.image.tag | default .Chart.AppVersion }}
{{- else }}
{{- fail "Image repository must be specified via --set image.repository=<value>" }}
{{- end }}
{{- end }} 